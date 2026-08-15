package com.finance.smartFinancialTracker.service;

import com.finance.smartFinancialTracker.dto.SignUpRequest;
import com.finance.smartFinancialTracker.dto.SignUpResponse;
import com.finance.smartFinancialTracker.entity.User;
import com.finance.smartFinancialTracker.repository.UserRepository;
import com.finance.smartFinancialTracker.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SignUpResponse signUp(SignUpRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .build();
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);

        return SignUpResponse.builder()
                .id(saved.getId())
                .fullName(saved.getFullName())
                .email(saved.getEmail())
                .build();
    }

    public String login(String email, String password){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email does not exists in the system"));
        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
