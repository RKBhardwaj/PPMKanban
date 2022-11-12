package com.rvhopstek.ppmkanban.repositories;

import com.rvhopstek.ppmkanban.domain.Backlog;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
  Backlog findByProjectIdentifier(String identifier);
}
