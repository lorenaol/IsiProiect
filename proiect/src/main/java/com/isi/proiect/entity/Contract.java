package com.isi.proiect.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "contracte")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contracte_seq")
    @SequenceGenerator(name = "contracte_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cerere_id", referencedColumnName = "id", nullable = false)
    private Cerere cerere;

    @ManyToOne
    @JoinColumn(name = "oferta_id", referencedColumnName = "id", nullable = false)
    private Oferta oferta;

    @ManyToOne
    @JoinColumn(name = "camion_id", referencedColumnName = "id", nullable = false)
    private Camion camion;

    private double cost;

    @Column(name = "termen_plata")
    private Date termenPlata;

    @Column(name = "loc_incarcare")
    private String locPlecare;

    @Column(name = "loc_descarcare")
    private String locDescarcare;

    @Column(name = "detalii_marfa")
    private String detaliiMarfa;

    @Column(name = "instructiuni_speciale")
    private String instructiuniSpeciale;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cerere getCerere() {
        return cerere;
    }

    public void setCerere(Cerere cerere) {
        this.cerere = cerere;
    }

    public Oferta getOferta() {
        return oferta;
    }

    public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }

    public Camion getCamion() {
        return camion;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Date getTermenPlata() {
        return termenPlata;
    }

    public void setTermenPlata(Date termenPlata) {
        this.termenPlata = termenPlata;
    }

    public String getLocPlecare() {
        return locPlecare;
    }

    public void setLocPlecare(String locPlecare) {
        this.locPlecare = locPlecare;
    }

    public String getLocDescarcare() {
        return locDescarcare;
    }

    public void setLocDescarcare(String locDescarcare) {
        this.locDescarcare = locDescarcare;
    }

    public String getDetaliiMarfa() {
        return detaliiMarfa;
    }

    public void setDetaliiMarfa(String detaliiMarfa) {
        this.detaliiMarfa = detaliiMarfa;
    }

    public String getInstructiuniSpeciale() {
        return instructiuniSpeciale;
    }

    public void setInstructiuniSpeciale(String instructiuniSpeciale) {
        this.instructiuniSpeciale = instructiuniSpeciale;
    }
}

