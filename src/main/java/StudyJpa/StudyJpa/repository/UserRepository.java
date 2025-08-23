package StudyJpa.StudyJpa.repository;

import StudyJpa.StudyJpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByUsername(String username);
    Optional<User> findByUsernameAndIsLockAndIsSocial(String username, Boolean isSocial, Boolean isLock );
}
