package com.isi.proiect.enums;

public enum MarfaEnum {
    MOBILA("MOBILA"),
    ANIMALE("ANIMALE"),
    ALIMENTE("ALIMENTE"),
    ECHIPAMENTE_MEDICALE("ECHIPAMENTE_MEDICALE"),
    AUTOTURISME("AUTOTURISME"),
    ELECTRONICE("ELECTRONICE"),
    UTILAJE("UTILAJE"),
    MATERIALE_CONSTRUCTII("MATERIALE_CONSTRUCTII"),
    PIESE_AUTO("PIESE_AUTO"),
    TRANSPORT_COLETE("TRANSPORT_COLETE");

    private final String code;

    MarfaEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
