package com.isi.proiect.serviceImpl;

import com.isi.proiect.entity.Cerere;
import com.isi.proiect.entity.Oferta;
import com.isi.proiect.repository.CerereRepository;
import com.isi.proiect.service.CerereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CerereServiceImpl implements CerereService {

    @Autowired
    private CerereRepository cerereRepository;

    @Override
    public Cerere addCerere(Cerere cerere) {
        return cerereRepository.save(cerere);
    }

    @Override
    public List<Cerere> getAll() {
        return cerereRepository.findAll();
    }

    @Override
    public Cerere updateCerere(Cerere cerere) {
        return cerereRepository.save(cerere);
    }

    @Override
    public void deleteCerere(Cerere cerere) {
        cerereRepository.delete(cerere);
    }

    @Override
    public List<Cerere> getAllRequestsByUserId(Long id) {
        return cerereRepository.findAllByUserId(id);
    }

    @Override
    public Cerere getCerereById(Long id) {
        return cerereRepository.getCerereById(id);
    }

    @Override
    public List<Cerere> getAllRequestsByStatus() {
        return cerereRepository.findAllByStatus();
    }


}
