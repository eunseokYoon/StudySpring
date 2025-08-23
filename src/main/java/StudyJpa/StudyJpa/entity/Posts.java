package StudyJpa.StudyJpa.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Posts extends BaseEntity{
    
    public Posts(String title, String content, User user) {
        this.title = title;
        this.content = content;
        this.user = user;
    }
    @Id
    @GeneratedValue
    @Column(name = "posts_id")
    private Long id;
    private String title;
    @Lob
    private String content;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comments> comments = new ArrayList<>();
}
