package com.isi.proiect.repository;

import com.isi.proiect.entity.Oferta;
import com.isi.proiect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long> {
    @Query("SELECT o FROM Oferta o WHERE o.user.id = ?1")
    List<Oferta> findAllByUserId(Long id);

    @Query("SELECT o FROM Oferta o WHERE o.id = ?1")
    Oferta getOfertaById(Long id);
}
