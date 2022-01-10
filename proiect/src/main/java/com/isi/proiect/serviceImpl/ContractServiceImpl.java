package com.isi.proiect.serviceImpl;

import com.isi.proiect.entity.Contract;
import com.isi.proiect.repository.ContractRepository;
import com.isi.proiect.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractServiceImpl implements ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Override
    public Contract addContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public List<Contract> getAll() {
        return contractRepository.findAll();
    }

    @Override
    public Contract updateContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public void deleteContract(Contract contract) {
        contractRepository.delete(contract);
    }
}
