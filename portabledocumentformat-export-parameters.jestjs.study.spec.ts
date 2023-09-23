import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortableDocumentFormatExportParametersComponent } from './PortableDocumentFormat-export-parameters.component';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialogRef } from '@angular/material/legacy-dialog';
import { Ma3PortableDocumentFormatexportService } from '../../services/ma3-PortableDocumentFormat-export-service/ma3PortableDocumentFormatexport.service';
import { TranslationsService } from '../../services/translations-service/translations-service';

describe('PortableDocumentFormatExportParametersComponent', () => {
  let component: PortableDocumentFormatExportParametersComponent;
  let fixture: ComponentFixture<PortableDocumentFormatExportParametersComponent>;
  let mockDialogRef: jasmine.SpyObj<MatLegacyDialogRef<PortableDocumentFormatExportParametersComponent>>;
  let mockExportService: jasmine.SpyObj<Ma3PortableDocumentFormatexportService>;
  let mockTranslationsService: jasmine.SpyObj<TranslationsService>;

  beforeEach(() => {
    const formBuilderSpy = jasmine.createSpyObj('UntypedFormBuilder', ['group']);
    mockDialogRef = jasmine.createSpyObj('MatLegacyDialogRef', ['close']);
    mockExportService = jasmine.createSpyObj('Ma3PortableDocumentFormatexportService', ['getAvailablePageSizes', 'getDefaultParams']);
    mockTranslationsService = jasmine.createSpyObj('TranslationsService', ['getTranslations']);

    TestBed.configureTestingModule({
      declarations: [PortableDocumentFormatExportParametersComponent],
      providers: [
        { provide: UntypedFormBuilder, useValue: formBuilderSpy },
        { provide: MatLegacyDialogRef, useValue: mockDialogRef },
        { provide: Ma3PortableDocumentFormatexportService, useValue: mockExportService },
        { provide: TranslationsService, useValue: mockTranslationsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortableDocumentFormatExportParametersComponent);
    component = fixture.componentInstance;
    mockExportService.getAvailablePageSizes.and.returnValue(['A4', 'Letter']);
    mockExportService.getDefaultParams.and.returnValue({
      fileName: 'default_file',
      orientation: 'portrait',
      size: 'A4',
      tableStyle: 'header_line_only',
      textSize: 12,
      alternateRows: true,
      printParametersPage: true,
      optimizeColumnsSize: false,
    });
    mockTranslationsService.getTranslations.and.returnValue({
      exportParameters: {
        orientationOptions: {
          portrait: 'Portrait',
          landscape: 'Landscape',
        },
        tableStyleOptions: {
          header_line_only: 'Header Line Only',
          no_borders: 'No Borders',
          light_horizontal_lines: 'Light Horizontal Lines',
        },
      },
    });
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const expectedDefaultValues = {
      fileName: 'default_file',
      orientation: 'portrait',
      size: 'A4',
      tableStyle: 'header_line_only',
      textSize: 12,
      alternateRows: true,
      printParametersPage: true,
      optimizeColumnsSize: false,
    };
    expect(component.form.value).toEqual(expectedDefaultValues);
  });

  it('should close the dialog when the form is submitted with valid data', () => {
    const formData = {
      fileName: 'test_file',
      orientation: 'landscape',
      size: 'Letter',
      tableStyle: 'no_borders',
      textSize: 14,
      alternateRows: false,
      printParametersPage: false,
      optimizeColumnsSize: true,
    };
    component.form.setValue(formData);
    component.submitForm();
    expect(mockDialogRef.close).toHaveBeenCalledWith(formData);
  });

  it('should not close the dialog when the form is submitted with invalid data', () => {
    const formData = {
      fileName: '',
      orientation: 'portrait',
      size: '',
      tableStyle: 'header_line_only',
      textSize: null,
      alternateRows: true,
      printParametersPage: false,
      optimizeColumnsSize: false,
    };
    component.form.setValue(formData);
    component.submitForm();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });
  
  it('should initialize the form with default values', () => {
    const expectedDefaultValues = {
      fileName: 'default_file',
      orientation: 'portrait',
      size: 'A4',
      tableStyle: 'header_line_only',
      textSize: 12,
      alternateRows: true,
      printParametersPage: true,
      optimizeColumnsSize: false,
    };
    expect(component.form.value).toEqual(expectedDefaultValues);
  });

  it('should close the dialog when the form is submitted with valid data', () => {
    const formData = {
      fileName: 'test_file',
      orientation: 'landscape',
      size: 'Letter',
      tableStyle: 'no_borders',
      textSize: 14,
      alternateRows: false,
      printParametersPage: false,
      optimizeColumnsSize: true,
    };
    component.form.setValue(formData);
    component.submitForm();
    expect(mockDialogRef.close).toHaveBeenCalledWith(formData);
  });

  it('should not close the dialog when the form is submitted with invalid data', () => {
    const formData = {
      fileName: '',
      orientation: 'portrait',
      size: '',
      tableStyle: 'header_line_only',
      textSize: null,
      alternateRows: true,
      printParametersPage: false,
      optimizeColumnsSize: false,
    };
    component.form.setValue(formData);
    component.submitForm();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should have valid orientation options', () => {
    const expectedOptions = [
      {
        value: 'portrait',
        label: 'Portrait',
      },
      {
        value: 'landscape',
        label: 'Landscape',
      },
    ];
    expect(component.orientations).toEqual(expectedOptions);
  });

  it('should have valid table style options', () => {
    const expectedOptions = [
      {
        value: 'header_line_only',
        label: 'Header Line Only',
      },
      {
        value: 'no_borders',
        label: 'No Borders',
      },
      {
        value: 'light_horizontal_lines',
        label: 'Light Horizontal Lines',
      },
    ];
    expect(component.tableStyles).toEqual(expectedOptions);
  });

  it('should call getFormData correctly', () => {
    const formData = {
      fileName: 'test_file',
      orientation: 'landscape',
      size: 'Letter',
      tableStyle: 'no_borders',
      textSize: 14,
      alternateRows: false,
      printParametersPage: false,
      optimizeColumnsSize: true,
    };
    component.form.setValue(formData);
    const result = component.getFormData();
    expect(result).toEqual(formData);
  });
});