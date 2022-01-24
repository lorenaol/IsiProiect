package com.isi.proiect.rest;

import com.isi.proiect.entity.Contract;
import com.isi.proiect.service.ContractService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/contracte")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping
    public List<Contract> getContracte() {
        return contractService.getAll();
    }

    @PostMapping
    public Contract addContract(@RequestBody Contract contract) {
        Contract c = null;
        if (contract != null) {
            c = contractService.addContract(contract);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Contract updateContract(@RequestBody Contract contract) {
        return contractService.updateContract(contract);
    }

    @DeleteMapping
    public void deleteContract(@RequestBody Contract contract) {
        contractService.deleteContract(contract);
    }

    @GetMapping(path = "/findByUserId")
    public List<Contract> getContractByUserId(@RequestParam(value = "userId") Long id) throws NotFoundException {
        return  contractService.findByUserId(id);
    }

    @GetMapping(path = "/findById")
    public Contract getContractById(@RequestParam(value = "id") Long id) throws NotFoundException {
        return  contractService.findById(id);
    }
}
