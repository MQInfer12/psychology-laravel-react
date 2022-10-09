<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Horario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CitaController extends Controller
{
    public function getAppointmentsSchedule($id)
    {
        return DB::select("SELECT c.id, h.fecha, h.hora_inicio, h.hora_final, u.email, u.nombre,
        c.id_horario 
        from citas c, horarios h, users u 
        where c.id_horario = h.id and h.id_docente=u.id and c.id_usuario=$id
        ");
    }

    public function allAppointmentsAvailables()
    {
        return DB::select("SELECT h.id, h.fecha, h.hora_inicio, h.hora_final, h.disponible, u.email,u.nombre 
        from horarios h, users u 
        where h.id_docente=u.id and h.disponible=true
        ");
    }


    public function scheduleAppointment(Request $request, $id)
    {
        $request->validate([
            'idUsuario' => 'required',
        ]);

        $horario = Horario::findOrFail($id);
        $horario->disponible = false;
        $horario->save();

        $cita = new Cita();
        $cita->id_horario = $id;
        $cita->id_usuario = $request->idUsuario;
        $cita->save();

        return response()->json(["mensaje" => "se asigno las cita correctamente"], 201);
    }

    public function show($id)
    {
        return Cita::find($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'id_horario' => 'required',
            'id_usuario' => 'required',
        ]);

        $grupoestudiante = Cita::findOrFail($id);
        $grupoestudiante->id_horario = $request->id_horario;
        $grupoestudiante->id_usuario = $request->id_usuario;

        $grupoestudiante->save();

        return response()->json(["mensaje" => "se modifico correctamente"], 201);
    }


    public function cancelAppointment($idHorario, $idCita)
    {
        $horario = Horario::findOrFail($idHorario);
        $horario->disponible = true;
        $horario->save();

        return Cita::destroy($idCita);
    }
}