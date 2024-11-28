import Debug "mo:base/Debug";

// Data structure for a user
actor User {
    type UserData = {
        username: Text;
        age: Int;
        weight: Float;
        height: Float;
        healthConditions: [Text];
        lifestyleHabits: [Text];
    };

    // Store for all registered users
    stable var users: [UserData] = [];

    // Register a new user
    public func registerUser(username: Text, age: Int, weight: Float, height: Float, healthConditions: [Text], lifestyleHabits: [Text]) : async Text {
        // Check if user already exists
        if (Array.exists<UserData>(users, func(u) { u.username == username })) {
            return "User already exists!";
        };

        // Create a new user and add it to the users list
        let newUser: UserData = {
            username = username;
            age = age;
            weight = weight;
            height = height;
            healthConditions = healthConditions;
            lifestyleHabits = lifestyleHabits;
        };

        users := Array.append<UserData>(users, [newUser]);
        return "User registered successfully!";
    };

    // Retrieve a user's data
    public func getUserData(username: Text) : async ?UserData {
        switch (Array.find<UserData>(users, func(u) { u.username == username })) {
            case (?user) return ?user;
            case (_) return null;
        };
    };

    // Update a user's data
    public func updateUserData(username: Text, weight: ?Float, height: ?Float, healthConditions: ?[Text], lifestyleHabits: ?[Text]) : async Text {
        switch (Array.find<UserData>(users, func(u) { u.username == username })) {
            case (?user) {
                // Update fields if provided
                var updatedUser = user;
                if (weight != null) { updatedUser.weight := weight; };
                if (height != null) { updatedUser.height := height; };
                if (healthConditions != null) { updatedUser.healthConditions := healthConditions; };
                if (lifestyleHabits != null) { updatedUser.lifestyleHabits := lifestyleHabits; };

                // Replace the old user with the updated data
                users := Array.map<UserData>(users, func(u) { if (u.username == username) updatedUser else u });
                return "User data updated successfully!";
            };
            case (_) return "User not found!";
        };
    };

    // Debug function to display all users (for testing purposes)
    public func debugUsers() : async () {
        Debug.print("Users: " # Array.toText(users));
    };
};
