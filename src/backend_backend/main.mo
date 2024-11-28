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

// Data structure for the AI health coach
actor HealthCoach {

    type HealthData = {
        username: Text;
        recommendedCalories: Float;
        exercisePlan: [Text];
        personalizedAdvice: [Text];
    };

    // Store for all health coaching data
    stable var healthRecords: [HealthData] = [];

    // Calculate daily calorie needs based on the Mifflin-St Jeor equation
    public func calculateCalories(weight: Float, height: Float, age: Int, gender: Text) : Float {
        let bmr: Float;
        if (gender == "male") {
            bmr := 10.0 * weight + 6.25 * height - 5.0 * Float(age) + 5.0;
        } else {
            bmr := 10.0 * weight + 6.25 * height - 5.0 * Float(age) - 161.0;
        };
        // Multiply by activity factor (e.g., 1.2 for sedentary, 1.5 for active)
        return bmr * 1.2; // Assume sedentary activity for simplicity
    };

    // Provide exercise plan based on user data
    public func generateExercisePlan(weight: Float, healthConditions: [Text]) : [Text] {
        var plan: [Text] = [];
        // Add exercise based on weight and health conditions
        if (weight > 100.0) {
            plan := Array.append<Text>(plan, ["Cardio exercises (walking, cycling)"]);
        };
        if (Array.exists<Text>(healthConditions, func(c) { c == "hypertension" })) {
            plan := Array.append<Text>(plan, ["Low-impact exercise like swimming"]);
        };
        return plan;
    };

    // Provide personalized advice based on health conditions
    public func generatePersonalizedAdvice(healthConditions: [Text]) : [Text] {
        var advice: [Text] = [];
        if (Array.exists<Text>(healthConditions, func(c) { c == "hypertension" })) {
            advice := Array.append<Text>(advice, ["Monitor blood pressure regularly"]);
        };
        if (Array.exists<Text>(healthConditions, func(c) { c == "diabetes" })) {
            advice := Array.append<Text>(advice, ["Avoid sugary foods, monitor blood sugar levels"]);
        };
        return advice;
    };

    // Assign health coach plan to a user
    public func createHealthPlan(username: Text, weight: Float, height: Float, age: Int, gender: Text, healthConditions: [Text]) : async Text {
        let recommendedCalories = calculateCalories(weight, height, age, gender);
        let exercisePlan = generateExercisePlan(weight, healthConditions);
        let personalizedAdvice = generatePersonalizedAdvice(healthConditions);

        let newHealthRecord: HealthData = {
            username = username;
            recommendedCalories = recommendedCalories;
            exercisePlan = exercisePlan;
            personalizedAdvice = personalizedAdvice;
        };

        healthRecords := Array.append<HealthData>(healthRecords, [newHealthRecord]);
        return "Health coach plan created successfully!";
    };

    // Get health plan for a user
    public func getHealthPlan(username: Text) : async ?HealthData {
        switch (Array.find<HealthData>(healthRecords, func(r) { r.username == username })) {
            case (?record) return ?record;
            case (_) return null;
        };
    };
};

