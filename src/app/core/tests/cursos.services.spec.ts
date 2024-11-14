import { CursosService } from '../services/cursos.service';
import { Curso } from '../../features/dashboard/cursos/models';
import { generateRandomString } from '../../shared/utils';

describe('Pruebas de CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    service = new CursosService();
  });

  it('Al obtener los cursos, debe devolver al menos un curso', (done) => {
    service.getCursos().subscribe(cursos => {
      expect(cursos.length).toBeGreaterThan(0);
      expect(cursos[0]).toEqual(jasmine.objectContaining({
        id: jasmine.any(String),
        name: jasmine.any(String),
        createdAt: jasmine.any(Date)
      }));
      done();
    });
  });

  it('Al crear un nuevo curso, debe devolver el curso creado con un id', (done) => {
    const nuevoCurso: Omit<Curso, 'id' | 'createdAt'> = { name: 'Nuevo Curso' };

    service.createCurso(nuevoCurso).subscribe(cursoCreado => {
      expect(cursoCreado).toEqual(jasmine.objectContaining({
        id: jasmine.any(String),
        name: nuevoCurso.name,
        createdAt: jasmine.any(Date)
      }));
      
      // Verificar que el nuevo curso se ha agregado a la base de datos
      service.getCursos().subscribe(cursos => {
        expect(cursos.length).toBe(4); // Deberia haber 4 cursos ahora
        done();
      });
    });
  });

  it('Al editar un curso existente, debe devolver el curso actualizado', (done) => {
    const cursos = service.getCursos();
    
    cursos.subscribe(cursosIniciales => {
      const cursoAEditar = cursosIniciales[0];
      const datosActualizados: Partial<Curso> = { name: 'Curso Editado' };
  
      service.editCurso(cursoAEditar.id, datosActualizados).subscribe(cursoEditado => {
        expect(cursoEditado.name).toBe(datosActualizados.name || ''); 
        
        // Verificar que el curso se ha actualizado en la base de datos
        service.getCursos().subscribe(cursosActualizados => {
          const cursoEditadoEncontrado = cursosActualizados.find(cur => cur.id === cursoAEditar.id);
          expect(cursoEditadoEncontrado?.name).toBe(datosActualizados.name || ''); // '' para asegurar de que no sea undefined
          done();
        });
      });
    });
  });

  it('Al intentar editar un curso inexistente, debe lanzar un error', (done) => {
    const idInvalido = generateRandomString(4);
    const datosActualizados: Partial<Curso> = { name: 'Inexistente' };

    service.editCurso(idInvalido, datosActualizados).subscribe({
      next: () => fail('Se esperaba un error, no cursos'),
      error: (error) => {
        expect(error.message).toBe('No se encontró el curso');
        done();
      }
    });
  });
});