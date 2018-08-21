/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tsoft.app.repository;

import com.tsoft.app.domain.ListeZones;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author tchipi
 */
/**
 * Spring Data JPA repository for the ListeZones entity.
 */
public interface ListeZonesRepository extends JpaRepository<ListeZones, Long> {

    public Page<ListeZones> findAllByActiviteAndEntrepotAndResponsableContaining(String activite,String entrepot,String responsable, Pageable pageable);

}



