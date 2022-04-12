package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Contents;
// import com.leipajono.app.data.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentsRepository extends JpaRepository<Contents, Long>{
    List<Contents> findByProductId(long productId);
}
