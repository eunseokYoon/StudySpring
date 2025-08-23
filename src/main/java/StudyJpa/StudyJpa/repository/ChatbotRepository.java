package StudyJpa.StudyJpa.repository;

import StudyJpa.StudyJpa.entity.Chatbot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.w3c.dom.Text;

import java.util.List;

public interface ChatbotRepository extends JpaRepository<Chatbot, Long> {
    List<Chatbot> findByContent(String content);
}
