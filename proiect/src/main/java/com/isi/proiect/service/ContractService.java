package com.isi.proiect.service;

import com.isi.proiect.entity.Contract;
import com.isi.proiect.entity.Oferta;

import java.util.List;

public interface ContractService {

    Contract addContract(Contract contract);

    List<Contract> getAll();

    Contract updateContract(Contract contract);

    void deleteContract(Contract contract);

    List<Contract> findByUserId(Long userId);

    Contract findById(Long id);
}
