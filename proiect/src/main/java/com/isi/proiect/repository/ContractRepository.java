package com.isi.proiect.repository;

import com.isi.proiect.entity.Cerere;
import com.isi.proiect.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    @Query("SELECT c FROM Contract c WHERE c.cerere.user.id = :id or c.oferta.user.id = :id")
    List<Contract> findContractsByUserId(Long id);

    @Query("SELECT c FROM Contract c WHERE c.id = ?1")
    Contract getContractById(Long id);
}
