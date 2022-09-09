import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../model/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http : HttpClient) { }

  private ADD_CLAIM : string = `http://localhost:8080/claim/api/addClaim`;

  claimSubmit(claim : Claim) : Observable<Claim>{
    return this.http.post<Claim>(this.ADD_CLAIM,claim,{headers : {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }

}
