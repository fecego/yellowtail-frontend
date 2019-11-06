import { Injectable } from '@angular/core';
import moment from 'moment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private apiService: ApiService) {

  }

  async getPurchaseData(financialData: any) {

    const shaData: any = {
      algorithm: 'SHA-256',
      chargetotal: Number(financialData.total).toFixed(2),
      currency: 484,
      txndatetime: moment().format('YYYY:MM:DD-HH:mm:ss'),
    };
    console.log('Sha data => ', shaData);

    try {
      const data: any = await this.apiService.sha(shaData);
      console.log('Data => ', data);
      if (!data.success) {
        return {
          success: false,
          message: 'Error al generar la compra, SHA'
        };
      }

      shaData.sha = data.sha;

    } catch(error) {
      return {
        success: false,
        message: 'Error al generar la compra'
      };
    }

    return {
      success: true,
      message: 'OK',
      data: shaData,
    };
  }
}
