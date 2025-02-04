export interface Personaje {
  id?: number; // Opcional, ya que se genera automáticamente en la base de datos
  usuario_id: number; // ID del usuario propietario
  tipo_id: number; // ID del tipo de personaje
  clase: string; // Clase del personaje
  subclase?: string; // Subclase del personaje (opcional)
  descripcion: string; // Descripción del personaje
  fecha_creacion?: Date; // Fecha de creación (opcional, generada automáticamente)
  nombre?: string; // Nombre del personaje (opcional)
}