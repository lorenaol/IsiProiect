package com.isi.proiect.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cereri")
public class Cerere {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cereri_seq")
    @SequenceGenerator(name = "cereri_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "loc_plecare", length = 100)
    private String locPlecare;

    @Column(name = "loc_sosire", length = 100)
    private String locSosire;

    @Column(name = "tip_marfa", length = 100)
    private String tipMarfa;

    @Column(name = "data_plecare", length = 100)
    private Date dataPlecare;

    @Column(name = "data_maxima_plecare", length = 100)
    private Date dataMaximaPlecare;

    @Column(name = "data_sosire", length = 100)
    private Date dataSosire;

    @Column(name = "data_maxima_sosire", length = 100)
    private Date dataMaximaSosire;

    private Long masa;

    private double buget;

    private Long volum;

    private String detalii;

    public String getDetalii() {
        return detalii;
    }

    public void setDetalii(String detalii) {
        this.detalii = detalii;
    }

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

    public String getLocPlecare() {
        return locPlecare;
    }

    public void setLocPlecare(String locPlecare) {
        this.locPlecare = locPlecare;
    }

    public String getLocSosire() {
        return locSosire;
    }

    public void setLocSosire(String locSosire) {
        this.locSosire = locSosire;
    }

    public String getTipMarfa() {
        return tipMarfa;
    }

    public void setTipMarfa(String tipMarfa) {
        this.tipMarfa = tipMarfa;
    }

    public Date getDataPlecare() {
        return dataPlecare;
    }

    public void setDataPlecare(Date dataPlecare) {
        this.dataPlecare = dataPlecare;
    }

    public Date getDataMaximaPlecare() {
        return dataMaximaPlecare;
    }

    public void setDataMaximaPlecare(Date dataMaximaPlecare) {
        this.dataMaximaPlecare = dataMaximaPlecare;
    }

    public Date getDataSosire() {
        return dataSosire;
    }

    public void setDataSosire(Date dataSosire) {
        this.dataSosire = dataSosire;
    }

    public Date getDataMaximaSosire() {
        return dataMaximaSosire;
    }

    public void setDataMaximaSosire(Date dataMaximaSosire) {
        this.dataMaximaSosire = dataMaximaSosire;
    }

    public Long getMasa() {
        return masa;
    }

    public void setMasa(Long masa) {
        this.masa = masa;
    }

    public double getBuget() {
        return buget;
    }

    public void setBuget(double buget) {
        this.buget = buget;
    }

    public Long getVolum() {
        return volum;
    }

    public void setVolum(Long volum) {
        this.volum = volum;
    }
}


