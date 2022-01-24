package com.isi.proiect.rest;

import com.isi.proiect.entity.Camion;
import com.isi.proiect.service.CamionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/camioane")
public class CamionController {

    @Autowired
    private CamionService camionService;

    @GetMapping
    public List<Camion> getCamioane() {
        return camionService.getAll();
    }

    @GetMapping(path = "/by-user-id")
    public List<Camion> getCamioaneByUserId(Long id) {
        return camionService.getAllByUserId(id);
    }

    @GetMapping(path = "/by-id")
    public Camion getCamioaneById(Long id) {
        return camionService.getCamionById(id);
    }

    @PostMapping
    public Camion addCamion(@RequestBody Camion camion) {
        Camion c = null;
        if (camion != null) {
            c = camionService.addCamion(camion);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Camion updateCamion (@RequestBody Camion camion) {
        return camionService.updateCamion(camion);
    }

    @PutMapping(path = "/status")
    @ResponseBody
    public Camion updateCamionStatus (String status, Long id) {
        return camionService.setStatus(status, id);
    }

    @DeleteMapping
    public void deleteCamion(@RequestBody Camion camion) {
        camionService.deleteCamion(camion);
    }
}
