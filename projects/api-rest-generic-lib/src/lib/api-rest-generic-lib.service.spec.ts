import {TestBed} from '@angular/core/testing';

import {ApiRestGenericLibService} from './api-rest-generic-lib.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

class TestData {
  name: string;
  firstName: string;
  id: number;

}

describe('ApiRestGenericLibService', () => {

  let httpTestingController: HttpTestingController;

  beforeEach(() => {


      TestBed.configureTestingModule({
        providers: [ApiRestGenericLibService],
        imports: [HttpClientTestingModule]
      });

      httpTestingController = TestBed.get(HttpTestingController);
    }
  );

  afterEach(() => {
    httpTestingController.verify();
  });

  describe(':', () => {

    function setup() {
      // We inject our service (which imports the HttpClient) and the Test Controller
      let service: ApiRestGenericLibService<TestData>;
      service = TestBed.get(ApiRestGenericLibService);
      service.url = 'http://localhost/data';
      return {service};
    }


    it('should be created', () => {

      const {service} = setup();
      expect(service).toBeTruthy();
    });

    it('getById', () => {

      const {service} = setup();

      const mockTest: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      service.getById(5)
        .subscribe((data: TestData) => {
          expect(data.name).toEqual(mockTest.name);
        });

      const req = httpTestingController.expectOne('http://localhost/data/5');

      expect(req.request.method).toEqual('GET');

      req.flush(mockTest);
    });
  });
});
