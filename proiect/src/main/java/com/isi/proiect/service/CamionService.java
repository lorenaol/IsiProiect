package com.isi.proiect.service;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.entity.Oferta;

import java.util.List;

public interface CamionService {

    Camion addCamion(Camion camion);

    List<Camion> getAll();

    Camion updateCamion(Camion camion);

    void deleteCamion(Camion camion);

    List<Camion> getAllByUserId(Long id);

    Camion getCamionById(Long id);

    Camion setStatus(String status, Long id);
}
