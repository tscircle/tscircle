exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (t) {
        t.integer('id').unsigned().primary();

        t.integer('ext_user_id').unsigned().unique().notNullable();
        t.integer('mangopay_user_id').unsigned().unique().notNullable();
        t.integer('mangopay_wallet_id').unsigned().unique().notNullable();
        t.string('wallet_iban').notNullable();

        t.timestamps(false, true);
    });
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

