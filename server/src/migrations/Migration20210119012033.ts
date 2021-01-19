import { Migration } from '@mikro-orm/migrations';

export class Migration20210119012033 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "player" add column "id" varchar(255) not null;');
  }

}
