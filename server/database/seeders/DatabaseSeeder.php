<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        /*\App\Models\User::factory()->create([
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'password' => '12345678',
            'genero' => 'hombre',
            'edad' => '20',
        ]);*/

        DB::table('sedes')->insert([
            'nombre' => 'Cochabamba',
            'habilitado' => '1',
        ]);
        DB::table('sedes')->insert([
            'nombre' => 'La Paz',
            'habilitado' => '1',
        ]);
        DB::table('sedes')->insert([
            'nombre' => 'El Alto',
            'habilitado' => '1',
        ]);
        DB::table('sedes')->insert([
            'nombre' => 'Santa Cruz',
            'habilitado' => '1',
        ]);
        DB::table('rols')->insert([
            'nombre' => 'beneficiario',
        ]);
    }
}
