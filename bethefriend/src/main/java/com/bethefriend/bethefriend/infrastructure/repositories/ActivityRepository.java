package com.bethefriend.bethefriend.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bethefriend.bethefriend.domain.Activity;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findBySeniorIdOrVoluntarioId(Long seniorId, Long voluntarioId);
}