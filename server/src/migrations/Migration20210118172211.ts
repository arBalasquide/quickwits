import { Migration } from '@mikro-orm/migrations';

export class Migration20210118172211 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "player" ("username" varchar(255) not null, "game_code" varchar(255) not null);');
    this.addSql('alter table "player" add constraint "player_pkey" primary key ("username", "game_code");');

    this.addSql('create table "game" ("game_code" varchar(255) not null, "players" text[] not null, "owner" varchar(255) not null);');
    this.addSql('alter table "game" add constraint "game_pkey" primary key ("game_code");');
  }

}
