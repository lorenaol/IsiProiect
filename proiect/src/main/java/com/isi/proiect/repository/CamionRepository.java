package com.isi.proiect.repository;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.entity.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CamionRepository extends JpaRepository<Camion, Long>  {
    @Query("SELECT c FROM Camion c WHERE c.user.id = ?1")
    List<Camion> findAllByUserId(Long id);

    @Query("SELECT c FROM Camion c WHERE c.id = ?1")
    Camion getCamionById(Long id);
}
