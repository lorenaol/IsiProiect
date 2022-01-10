package com.isi.proiect.service;

import com.isi.proiect.entity.Cerere;
import com.isi.proiect.entity.Oferta;
import liquibase.pro.packaged.C;

import java.util.List;

public interface CerereService {

    Cerere addCerere(Cerere cerere);

    List<Cerere> getAll();

    Cerere updateCerere(Cerere cerere);

    void deleteCerere(Cerere cerere);
}
