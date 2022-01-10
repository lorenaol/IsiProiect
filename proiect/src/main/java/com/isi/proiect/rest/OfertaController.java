package com.isi.proiect.rest;

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

    @PostMapping
    public Oferta addOferta(@RequestBody Oferta oferta) {
        Oferta o = null;
        if (oferta != null) {
            o = ofertaService.addOferta(oferta);
        }
        return o;
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
