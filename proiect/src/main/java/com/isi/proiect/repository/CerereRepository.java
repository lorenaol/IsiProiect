package com.isi.proiect.repository;

import com.isi.proiect.entity.Cerere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CerereRepository extends JpaRepository<Cerere, Long> {
}
