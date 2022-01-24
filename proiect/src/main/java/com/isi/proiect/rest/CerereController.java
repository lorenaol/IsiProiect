package com.isi.proiect.rest;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.entity.Cerere;
import com.isi.proiect.entity.Oferta;
import com.isi.proiect.service.CerereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/cereri")
public class CerereController {

    @Autowired
    private CerereService cerereService;

    @GetMapping
    public List<Cerere> getCereri() {
        return cerereService.getAll();
    }

    @GetMapping(path = "/status")
    public List<Cerere> getOffersByStatus() {
        return cerereService.getAllRequestsByStatus();
    }

    @GetMapping(path = "/by-user-id")
    public List<Cerere> getOffersByUserId(Long id) {
        return cerereService.getAllRequestsByUserId(id);
    }

    @GetMapping(path = "/by-id")
    public Cerere getOfertaById(Long id) {
        return cerereService.getCerereById(id);
    }

    @PostMapping
    public Cerere addCerere(@RequestBody Cerere cerere) {
        Cerere c = null;
        if (cerere != null) {
            c = cerereService.addCerere(cerere);
        }
        return c;
    }

    @PutMapping(path = "/status")
    @ResponseBody
    public Cerere updateCerereStatus (String status, Long id) {
        return cerereService.setStatus(status, id);
    }

    @PutMapping
    @ResponseBody
    public Cerere updateCerere(@RequestBody Cerere cerere) {
        return cerereService.updateCerere(cerere);
    }

    @DeleteMapping
    public void deleteCerere(@RequestBody Cerere cerere) {
        cerereService.deleteCerere(cerere);
    }

}
