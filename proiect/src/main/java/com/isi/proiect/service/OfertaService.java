package com.isi.proiect.service;

import com.isi.proiect.entity.Oferta;
import com.isi.proiect.entity.User;

import java.util.List;

public interface OfertaService {

    Oferta addOferta(Oferta oferta);

    List<Oferta> getAll();

    Oferta updateOferta(Oferta oferta);

    void deleteOferta(Oferta oferta);

    List<Oferta> getAllOffersByUserId(Long id);

    Oferta getOfertaById(Long id);
}
