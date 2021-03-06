package com.isi.proiect.serviceImpl;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.repository.CamionRepository;
import com.isi.proiect.repository.CerereRepository;
import com.isi.proiect.service.CamionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CamionServiceImpl implements CamionService {

    @Autowired
    private CamionRepository camionRepository;

    @Override
    public Camion addCamion(Camion camion) {
        return camionRepository.save(camion);
    }

    @Override
    public List<Camion> getAll() {
        return camionRepository.findAll();
    }

    @Override
    public Camion updateCamion(Camion camion) {
        return camionRepository.save(camion);
    }

    @Override
    public void deleteCamion(Camion camion) {
        camionRepository.delete(camion);
    }

    @Override
    public List<Camion> getAllByUserId(Long id) {
        return camionRepository.findAllByUserId(id);
    }

    @Override
    public Camion getCamionById(Long id) {
        return camionRepository.getCamionById(id);
    }

    @Override
    public Camion setStatus(String status, Long id) {
        Camion camion = camionRepository.getCamionById(id);
        camion.setStatus(status);
        camionRepository.save(camion);
        return camion;
    }
}
