package com.isi.proiect.service;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.entity.Cerere;
import com.isi.proiect.entity.Oferta;
import liquibase.pro.packaged.C;

import java.util.List;

public interface CerereService {

    Cerere addCerere(Cerere cerere);

    List<Cerere> getAll();

    Cerere updateCerere(Cerere cerere);

    void deleteCerere(Cerere cerere);

    List<Cerere> getAllRequestsByUserId(Long id);

    Cerere getCerereById(Long id);

    List<Cerere> getAllRequestsByStatus();

    Cerere setStatus(String status, Long id);
}
