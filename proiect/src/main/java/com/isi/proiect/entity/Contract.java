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

    private Long cost;

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


}

