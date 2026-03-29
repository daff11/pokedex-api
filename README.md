# Pokedex API

## Project Overview
Simple Pokedex backend API that fetches Pokémon data from PokeAPI, stores it in PostgreSQL, and caches with Redis.  
Provided with simple frontend in file named index.html

---

## Setup Instructions

1. **Clone repository**
```bash
git clone <YOUR_REPO_URL>
cd pokedex-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file in project root**
PORT=3000
DB_NAME=pokedex
DB_USER=postgres
DB_PASS=1234
DB_HOST=localhost
REDIS_URL=redis://localhost:6379

4. **Ensure PostgreSQL is running**
- Database name: pokedex
- Table pokemon exists (or let Sequelize auto-create)

5. **Ensure Redis is running**
- Default port: 6379
- Test: redis-cli ping → should return PONG (can try on your terminal or CMD)

6. **Run Server**
```bash
node src/app.js
```
Server runs on http://localhost:3000


## API Endpoints
1. **Get All Pokemon**
GET /pokemon
- Retrieves all Pokémon stored in database/Redis cache.
Response Example:
```json
[
    {
        "id": 2,
        "name": "ivysaur",
        "height": 10,
        "weight": 130,
        "base_experience": 142,
        "image": "ivysaur.png"
    },
    {
        "id": 3,
        "name": "venusaur",
        "height": 20,
        "weight": 1000,
        "base_experience": 236,
        "image": "venusaur.png"
    },
    {
        "id": 1,
        "name": "bulba-new",
        "height": 7,
        "weight": 69,
        "base_experience": 64,
        "image": "1774693475912.png"
    }
]
```
2. **Get Pokemon by ID**
GET /pokemon/{id}
- Retrieves a specific Pokémon by ID from Redis → DB → PokeAPI.
Response Example:
```json
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "base_experience": 64,
  "image": "bulbasaur.png"
}
```
3. **Sync Pokemon**
POST /pokemon/sync/{id}
- Fetches Pokémon from PokeAPI and stores it in DB.
- Clears Redis cache for this Pokémon.
Response Example:
```json
{
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "base_experience": 64,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
}
```
4. **Update Pokemon**
PUT /pokemon/{id}
- Updates Pokémon in database.
Body (form-data):
```vbnet
name: string
height: number
weight: number
base_experience: number
image: file (optional)
```
- Clears Redis cache for this Pokémon
Response Example:
```json
{
    "id": 1,
    "name": "bulba-new",
    "height": 7,
    "weight": 69,
    "base_experience": 64,
    "image": "1774693475912.png"
}
```
5. **Delete Pokemon**
DELETE /pokemon/{id}
- Deletes Pokémon from database.
- Clears Redis cache.
Response Example:
```json
{
    "message": "Deleted"
}
```

## Example testing flow:
1. POST /pokemon/sync/1 → sync Bulbasaur.
2. GET /pokemon/1 → returns cached Bulbasaur.
3. GET /pokemon → returns all cached Pokémon.
4. PUT /pokemon/1 → update name/image.
4. DELETE /pokemon/4 → remove from DB & cache.

## Notes
- Redis cache expires in 60s per Pokémon.
- All external calls are cached to minimize PokeAPI requests.
- Database table is automatically synced with Sequelize
