package StudyJpa.StudyJpa.service;

import StudyJpa.StudyJpa.dto.UserRequestDto;
import StudyJpa.StudyJpa.entity.User;
import StudyJpa.StudyJpa.entity.UserRoleType;
import StudyJpa.StudyJpa.repository.UserRepository;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    // 자체 로그인 회원가입 존재 여부
    @Transactional(readOnly = true)
    public Boolean existUser(UserRequestDto dto) {
        return userRepository.existsByUsername(dto.getUsername());
    }

    @Transactional
    public Long addUser(UserRequestDto dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("이미 유저가 존재합니다.");
        } // 사용자가 프론트가 아닌 포스트맨이나 해킹툴을 이용한 접속을 할 수 있으므로 백엔드에서 다시 검증

        User entity = User.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .isLock(false)
                .isSocial(false)
                .roleType(UserRoleType.USER)
                .nickname(dto.getNickname())
                .email(dto.getEmail())
                .build();

        return userRepository.save(entity).getId();
    }

    //자체 로그인 회원 정보 수정
    @Transactional
    public Long updateUser(UserRequestDto dto) {

        //본인만 수정 가능 검증
        String sessionUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!sessionUsername.equals(dto.getUsername())) {
            throw new AccessDeniedException("본인 계정만 수정 가능.");
        }

        //조회
        User entity = userRepository.findByUsernameAndIsLockAndIsSocial(dto.getUsername(), false, false)
                .orElseThrow(() -> new UsernameNotFoundException(dto.getUsername()));

        // 회원 정보 수정
        entity.updateUser(dto);

        return userRepository.save(entity).getId();
    }

}
