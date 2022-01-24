package com.isi.proiect.entity;

import javax.persistence.*;

@Entity
@Table(name = "camioane")
public class Camion {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "camioane_seq")
    @SequenceGenerator(name = "camioane_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String status;

    private String locatie;

    private Long volum;

    private Long gabarit;

    private Long greutate;

    private String detalii;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocatie() {
        return locatie;
    }

    public void setLocatie(String locatie) {
        this.locatie = locatie;
    }

    public Long getVolum() {
        return volum;
    }

    public void setVolum(Long volum) {
        this.volum = volum;
    }

    public Long getGabarit() {
        return gabarit;
    }

    public void setGabarit(Long gabarit) {
        this.gabarit = gabarit;
    }

    public Long getGreutate() {
        return greutate;
    }

    public void setGreutate(Long greutate) {
        this.greutate = greutate;
    }

    public String getDetalii() {
        return detalii;
    }

    public void setDetalii(String detalii) {
        this.detalii = detalii;
    }
}

