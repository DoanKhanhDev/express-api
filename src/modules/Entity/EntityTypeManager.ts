import { DataSource, Repository, ObjectLiteral} from "typeorm";
import Connection from "../Connection/Connection";

/**
 * The Entity type manager interface.
 */
interface EntityTypeManager {

  /**
   * Get entity type manager from entity manager.
   *
   * @returns The entity manager type based from entity manager.
   */
  getStorage(): Repository<ObjectLiteral> | null;
}

/**
 * The entity type manager base from Datasource
 */
export default new (class EntityTypeManager implements EntityTypeManager {
  /**
   * The entity type manager.
   */
  protected connection: DataSource;

  constructor() {
    this.connection = Connection.getConnection();
  }

  public getStorage(name: string): Repository<ObjectLiteral> | null {
    if (name.length === 0) {
      return null;
    }
    return this.connection.getRepository(name);
  }
})();
