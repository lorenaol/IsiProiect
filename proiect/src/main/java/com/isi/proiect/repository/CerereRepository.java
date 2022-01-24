package com.isi.proiect.repository;

import com.isi.proiect.entity.Cerere;
import com.isi.proiect.entity.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CerereRepository extends JpaRepository<Cerere, Long> {
    @Query("SELECT c FROM Cerere c WHERE c.user.id = ?1")
    List<Cerere> findAllByUserId(Long id);

    @Query("SELECT c FROM Cerere c WHERE c.id = ?1")
    Cerere getCerereById(Long id);

    @Query("SELECT c FROM Cerere c WHERE c.status = 'in asteptare'")
    List<Cerere> findAllByStatus();
}
