package com.isi.proiect.rest;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.entity.Oferta;
import com.isi.proiect.entity.User;
import com.isi.proiect.service.OfertaService;
import com.isi.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/oferte")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;

    @GetMapping
    public List<Oferta> getOferte() {
        return ofertaService.getAll();
    }

    @GetMapping(path = "/status")
    public List<Oferta> getOferteByStatus() {
        return ofertaService.getAllOffersByStatus();
    }

    @GetMapping(path = "/by-user-id")
    public List<Oferta> getOffersByUserId(Long id) {
        return ofertaService.getAllOffersByUserId(id);
    }

    @GetMapping(path = "/by-id")
    public Oferta getOfertaById(Long id) {
        return ofertaService.getOfertaById(id);
    }

    @PostMapping
    public Oferta addOferta(@RequestBody Oferta oferta) {
        Oferta o = null;
        if (oferta != null) {
            o = ofertaService.addOferta(oferta);
        }
        return o;
    }

    @PutMapping(path = "/status")
    @ResponseBody
    public Oferta updateOfertaStatus (String status, Long id) {
        return ofertaService.setStatus(status, id);
    }

    @PutMapping
    @ResponseBody
    public Oferta updateOferta(@RequestBody Oferta oferta) {
        return ofertaService.updateOferta(oferta);
    }

    @DeleteMapping
    public void deleteOferta(@RequestBody Oferta oferta) {
        ofertaService.deleteOferta(oferta);
    }
}
