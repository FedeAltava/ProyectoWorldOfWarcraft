export interface Personaje {
  id?: number; // Opcional, ya que se genera automáticamente
  usuario_id: number; // ID del usuario propietario (obligatorio)
  tipo_id: number; // ID del tipo de personaje (obligatorio)
  clase: string; // Clase del personaje (obligatorio)
  subclase?: string; // Subclase del personaje (opcional)
  descripcion: string; // Descripción del personaje (obligatorio)
  fecha_creacion?: Date; // Fecha de creación (opcional, generada automáticamente)
  nombre?: string; // Nombre del personaje (opcional)
  nivel?: number; // Nivel del personaje (opcional)
}