package com.alumniconnect.repository;

import com.alumniconnect.entity.Event;
import com.alumniconnect.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAllByOrderByEventDateAsc();

    @Query("SELECT e FROM Event e JOIN FETCH e.organizer WHERE " +
           "(:keyword IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:eventType IS NULL OR e.eventType = :eventType) " +
           "ORDER BY e.eventDate ASC")
    List<Event> searchEvents(@Param("keyword") String keyword, @Param("eventType") EventType eventType);
}
