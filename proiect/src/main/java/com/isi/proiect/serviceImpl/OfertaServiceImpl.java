package com.isi.proiect.serviceImpl;

import com.isi.proiect.entity.Oferta;
import com.isi.proiect.repository.OfertaRepository;
import com.isi.proiect.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfertaServiceImpl implements OfertaService {

    @Autowired
    private OfertaRepository ofertaRepository;

    @Override
    public Oferta addOferta(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Override
    public List<Oferta> getAll() {
        return ofertaRepository.findAll();
    }

    @Override
    public Oferta updateOferta(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Override
    public void deleteOferta(Oferta oferta) {
        ofertaRepository.delete(oferta);
    }

    @Override
    public List<Oferta> getAllOffersByUserId(Long id) {
        return ofertaRepository.findAllByUserId(id);
    }

    @Override
    public Oferta getOfertaById(Long id) {
        return ofertaRepository.getOfertaById(id);
    }

    @Override
    public List<Oferta> getAllOffersByStatus() {
        return ofertaRepository.findAllByStatus();
    }
}
