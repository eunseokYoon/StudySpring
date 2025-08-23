package StudyJpa.StudyJpa.repository;

import StudyJpa.StudyJpa.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Long> {
    List<Posts> findByTitle(String title);
}
