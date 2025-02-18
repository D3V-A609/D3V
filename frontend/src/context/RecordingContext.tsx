import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// 인터페이스: 녹음 상태와 제어 함수 정의
interface RecordingContextProps {
  isRecordingMode: boolean;  // 녹음 모드 활성화 여부 => 녹음 페이지로 이동 여부 결정
  isRecording : boolean; // 현재 녹음 중인지 여부
  isStartRecordFirst: boolean;  // 녹음을 처음 시작했는지 여부
  isPaused: boolean; // 일시정지 상태인지를 저장
  isRecordingStopped: boolean; // 녹음이 끝난 것인지를 저장
  audioLevel: number; // audio 비주얼라이저를 위한 변수수
  mediaBlob: Blob | undefined;  // 녹음된 오디오 Blob 데이터터
  enterRecordingMode: () => void;  // 녹음 모드 시작 함수
  exitRecordingMode: () => void;  // 녹음 모드 종료 함수
  startRecording: () => void;  // 녹음 시작 함수
  togglePauseResume: () => void; // 녹임 일시정지 및 재개 함수수
  stopRecording: () => void;  // 녹음 정지 함수
  resetRecording: () => void;
  elapsedTime: number;
}

const RecordingContext = createContext<RecordingContextProps | undefined>(undefined);

// Provider 컴포넌트: 녹음 모드 상태 및 제어 함수 관리
export const RecordingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecordingMode, setIsRecordingMode] = useState(false);  // 녹음 모드 상태 관리
  const [isStartRecordFirst, setStartRecordFirst] = useState(false);  // 첫 녹음 여부 관리
  const [isRecording, setIsRecording] = useState(false); // 녹음이 진행중인지 여부를 관리
  const [isPaused, setIsPaused] = useState(false);
  const [isRecordingStopped, setIsRecordingStopped] = useState(false);
  const [mediaBlob, setMediaBlob] = useState<Blob | undefined>(undefined);  // 녹음된 오디오 URL 저장
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recorderChunksRef = useRef<Blob[]>([]);

  const [elapsedTime, setElapsedTime] = useState(0); // 녹음 경과 시간 관리
  const [startTime, setStartTime] = useState(0);


  // audio visualizer을 위한 설정
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  

  // 녹음 모드 시작(창 변환) 함수
  const enterRecordingMode = () => {
    setIsRecordingMode(true);
  };

  // 녹음 모드 종료(창 변환) 함수
  const exitRecordingMode = () => {
    setIsRecordingMode(false);
  };

  // 녹음 시작
  const startRecording = () => {
    if(isStartRecordFirst) return; // 녹음이 이미 시작된 ㅕㅇ우 방지지
    navigator.mediaDevices.getUserMedia({ audio: true}).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recorderChunksRef.current = []; // 이전 녹음 데이터 초기화

      mediaRecorder.ondataavailable = (event) => {
        if(event.data.size > 0){
          recorderChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if(recorderChunksRef.current.length > 0){
          const blob = new Blob(recorderChunksRef.current, { type: 'audio/webm'});
          setMediaBlob(blob);
        }        
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setIsRecordingStopped(false);  // 녹음 종료 상태 초기화
      setStartRecordFirst(true);
      setAudioLevel(0);

      // 정확한 시간 계산을 위해 startTime 설정
      setStartTime(Date.now() - elapsedTime * 1000);
    });
  };

  // 녹음 중지
  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setAudioLevel(0);
    setIsRecordingStopped(true);
    stopAudioAnalysis();

    mediaRecorderRef.current?.stop();

    setElapsedTime(0);
    setStartTime(0);
  }

  // 녹음 일시정지/재개 핸들러
  const togglePauseResume = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();  // 녹음 재개

      // 일시정지 해제 시, 기존 경과 시간 유지
      setStartTime(Date.now() - elapsedTime * 1000);
      setIsRecording(true);
    } else {
      mediaRecorderRef.current?.pause();  // 녹음 일시정지

      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));

      setIsRecording(false);
    }
    setIsPaused(!isPaused);  // 상태 반전
  };

  const resetRecording = () => {
    stopRecording();
    setTimeout(() => {
      setIsRecording(false);
      setIsPaused(false);
      setIsRecordingStopped(false);
      setMediaBlob(undefined);  // 오디오 URL 초기화
      setStartRecordFirst(false);
      recorderChunksRef.current = [];  // 녹음 데이터 초기화

      setElapsedTime(0);
    }, 10);  // 상태 업데이트를 비동기적으로 반영
  };

  useEffect(() => {
    let animationFrameId: number;

    const updateElapsedTime = () => {
      if(isRecording && !isPaused){
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        animationFrameId = requestAnimationFrame(updateElapsedTime);
      }
    };

    if(isRecording){
      animationFrameId = requestAnimationFrame(updateElapsedTime);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRecording, isPaused, startTime])
  

  // 오디오 비주얼라이저 설정
  useEffect(() => {
    let animationFrameId: number;

    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;
        analyserNodeRef.current = analyserNode;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyserNode);

        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

        const updateAudioLevel = () => {
          analyserNode.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setAudioLevel(volume);
          animationFrameId = requestAnimationFrame(updateAudioLevel);
        };

        updateAudioLevel();
      });
    } else {
      stopAudioAnalysis();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      stopAudioAnalysis();
    };
  }, [isRecording]);

  const stopAudioAnalysis = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserNodeRef.current = null;
  };

  return (
    <RecordingContext.Provider
      value={{
        isRecordingMode,
        isRecording,
        isStartRecordFirst,
        isPaused,
        isRecordingStopped,
        mediaBlob,
        audioLevel,
        enterRecordingMode,
        exitRecordingMode,
        startRecording,
        stopRecording,
        togglePauseResume,
        resetRecording,
        elapsedTime,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};

// Custom Hook: Context에 쉽게 접근할 수 있도록 하는 훅
export const useRecordingContext = () => {
  const context = useContext(RecordingContext);

  // Context가 Provider 내부에서 사용되지 않으면 에러를 발생시킴
  if (!context) {
    throw new Error('useRecordingContext must be used within RecordingProvider');
  }

  return context;  // Context 값을 반환
};
