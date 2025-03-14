package com.ssafy.d3v.backend.common.validation.validator;

import com.ssafy.d3v.backend.common.validation.annotation.AccessLevelValid;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class AccessLevelValidator implements ConstraintValidator<AccessLevelValid, String> {

    private Set<String> acceptedValues;

    @Override
    public void initialize(AccessLevelValid annotation) {
        acceptedValues = Arrays.stream(annotation.enumClass().getEnumConstants())
                .map(e -> e.name().toUpperCase())
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && acceptedValues.contains(value.toUpperCase());
    }
}
