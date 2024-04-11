package com.codecool.myFridge.repository;
import com.codecool.myFridge.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<Member,Integer> {

    @Query("SELECT m FROM Member  m WHERE m.name = :name")
    Member findMemberByName(@Param("name") String name);
}
